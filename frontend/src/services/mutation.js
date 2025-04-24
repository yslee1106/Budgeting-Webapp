import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useOptimisticMutation = (mutationFn, queryKeys, updateData, invalidateKeys, successFn,) => {
    const queryClient = useQueryClient();
    const previousData = {};
    const tempIds = {};

    return useMutation({
        mutationFn: mutationFn,
        onMutate: async (variables) => {
            await Promise.all(
                queryKeys.map(key =>
                    queryClient.cancelQueries(key)
                )
            )

            queryKeys.forEach((key) => {
                previousData[key] = queryClient.getQueryData(key);
                if (updateData[key]) {
                    const tempId = Date.now().toString() + Math.random().toString(36).substring(2);
                    tempIds[key] = tempId;

                    queryClient.setQueryData(key, (old) => {
                        const updatedData = updateData[key](old, variables);
                        // Add tempId and isOptimistic flag if the data is an object/array
                        if (updatedData && typeof updatedData === 'object') {
                            if (Array.isArray(updatedData)) {
                                return updatedData.map(item => ({
                                    ...item,
                                    ...(item.id === undefined && { id: tempId, isOptimistic: true })
                                }));
                            } else {
                                return {
                                    ...updatedData,
                                    ...(updatedData.id === undefined && { id: tempId, isOptimistic: true })
                                };
                            }
                        }
                        return updatedData;
                    });
                }
            });

            return { previousData, tempIds };
        },
        onError: (err, variables, context) => {
            console.error('Error: ', err);

            if (context?.previousData) {
                Object.entries(context.previousData).forEach(([key, data]) => {
                    queryClient.setQueryData(key, data);
                });
            }
        },
        onSuccess: (data, variables, context) => {
            if (successFn) {
                successFn.forEach(fn => fn({
                    data,
                    variables,
                    context: {
                        ...context,
                        tempIds: context.tempIds
                    }
                }));
            }

            // Merge server response with cache
            if (context?.tempIds) {
                Object.entries(context.tempIds).forEach(([key, tempId]) => {
                    queryClient.setQueryData(key, (old) => {
                        if (Array.isArray(old)) {
                            return old.map(item =>
                                item.id === tempId ? { ...item, ...data, isOptimistic: false } : item
                            );
                        }
                        return old;
                    });
                });
            }
        },
        onSettled: async () => {
            invalidateKeys.forEach(async key => {
                await queryClient.invalidateQueries({key});
            })
        }
    });
};
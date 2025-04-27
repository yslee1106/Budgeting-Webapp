import { useOptimisticMutation } from "services/mutation";
import { patchProfile } from 'services/user/requests/patch';

const usePatchProfile = () => {
    return useOptimisticMutation(
        patchProfile,
        [['profile']],
        {
            ['profile']: (oldProfile, newProfile) => {
                return {
                    ...oldProfile,
                    ...newProfile,
                }
            },
        },
        [['profile']],
    )
}

export {
    usePatchProfile,
};
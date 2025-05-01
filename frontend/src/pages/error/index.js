import React from 'react';

const ErrorPage = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
            padding: '1rem'
        }}>
            <h1>Oops!</h1>
            <p>Something went wrong. Please try again later.</p>
            <button onClick={() => window.location.reload()} style={{
                padding: '0.5rem 1rem',
                fontSize: '1rem',
                cursor: 'pointer'
            }}>
                Reload
            </button>
        </div>
    );
};

export default ErrorPage;
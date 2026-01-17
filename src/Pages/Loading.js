import React from 'react';

const Loading = () => {
    return (
        <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', display: 'flex', height: "100vh" }}>
            <div class="loader-circle-11">
                <div class="arc"></div>
                <div class="arc"></div>
                <div class="arc"></div>
            </div>
        </div>
    );
}

export default Loading;

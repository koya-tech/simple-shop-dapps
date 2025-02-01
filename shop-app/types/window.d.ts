/* eslint-disable @typescript-eslint/no-explicit-any */
// types/window.d.ts

export {};

declare global {
    interface Window {
        ethereum: {
            isMetaMask?: boolean;
            request: (request: {
                method: string;
                params?: Array<any>;
            }) => Promise<any>;
            on: (event: string, callback: (params?: any) => void) => void;
            removeListener: (
                event: string,
                callback: (params?: any) => void
            ) => void;
        };
    }
}

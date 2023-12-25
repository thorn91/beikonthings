// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="lucia" />
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            validate: import('@lucia-auth/sveltekit').Validate;
            validateUser: import('@lucia-auth/sveltekit').ValidateUser;
            setSession: import('@lucia-auth/sveltekit').SetSession;
            auth: import('lucia').AuthRequest;
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }

    namespace Lucia {
        type Auth = import('$lib/server/lucia').Auth;
        type DatabaseUserAttributes = {};
        type DatabaseSessionAttributes = {};
    }
}

export {};

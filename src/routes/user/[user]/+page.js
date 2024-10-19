export const ssr = false;

export function load({ params }) {
    return { user: params.user };
}
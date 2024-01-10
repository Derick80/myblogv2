// app/routes/magic-link.tsx

import { LoaderFunctionArgs } from '@remix-run/node';
import { authenticator } from '~/server/auth/auth.server';

export async function loader ({ request }: LoaderFunctionArgs) {
    await authenticator.authenticate('TOTP', request, {
        successRedirect: '/account',
        failureRedirect: '/login',
    })
}
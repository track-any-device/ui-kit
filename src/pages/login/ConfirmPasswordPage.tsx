import { useState } from "react";
import { AuthLayoutVariant } from "../../index";
import { ConfirmPasswordForm } from "../../elements/ConfirmPasswordForm";
import { AuthLayoutResolved, AUTH_LAYOUT_ARG_TYPE } from "../../layouts/LayoutSwitcher";


export default function ConfirmPasswordPage({
    authLayout, 
    password , 
    setPassword, 
    errors = {}, 
    processing = false, 
    title ="Confirm password", 
    description = "This is a secure area — please re-enter your password"
}: { 
    authLayout: AuthLayoutVariant; 
    password: string; 
    setPassword: (password: string) => void;
    errors?: { password?: string };
    processing?: boolean;
    title?: string;
    description?: string;
}) {
    return (
        <AuthLayoutResolved variant={authLayout} title={title} description={description}>
            <ConfirmPasswordForm
                password={password}
                    errors={errors}
                    processing={processing}
                    onChange={setPassword}
                    onSubmit={(e) => e.preventDefault()}
                />
            </AuthLayoutResolved>
        );
}
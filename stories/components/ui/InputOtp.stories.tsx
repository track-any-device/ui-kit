import type { Meta, StoryObj } from '@storybook/react';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@track-any-device/components';

const meta: Meta = { title: 'Components/UI/InputOTP', tags: ['autodocs'] };
export default meta;

export const SixDigit: StoryObj = {
    render: () => (
        <div className="p-6">
            <InputOTP maxLength={6}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
        </div>
    ),
};

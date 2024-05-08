import supabase from '@/services/supabase'
import { ThemeVariables, ThemeSupa } from '@supabase/auth-ui-shared'

import { Auth } from '@supabase/auth-ui-react'
import Logo from '@/ui/Logo'

type CustomThemeType = {
    default: ThemeVariables
}

const customTheme: CustomThemeType = {
    default: {
        colors: {
            brand: '#63c582',
            brandAccent: '#45bb6a',
            brandButtonText: '#f2fbf5',
            defaultButtonBackground: '#f0f9ff',
            defaultButtonBackgroundHover: '#e1f2fd',
            defaultButtonBorder: '#aab0b6',
            defaultButtonText: '#43464b',
            dividerBackground: '#45bb6a',
            inputBackground: '#f0f9ff',
            inputBorder: '#98ddad',
            inputBorderHover: '#63c582',
            inputBorderFocus: '#45bb6a',
            inputText: '#102631',
            inputLabelText: '#565c64',
            inputPlaceholder: '#808890',
            messageText: '#4a4e54',
            messageTextDanger: '#e0222e',
            anchorTextColor: '#15a1e2',
            anchorTextHoverColor: '#0b5781',
        },

        space: {
            spaceSmall: '8px',
            spaceMedium: '12px',
            spaceLarge: '24px',
            labelBottomMargin: '8px',
            anchorBottomMargin: '5px',
            emailInputSpacing: '6px',
            socialAuthSpacing: '12px',
            buttonPadding: '10px 24px',
            inputPadding: '10px 20px',
        },
        fontSizes: {
            baseBodySize: '14px',
            baseInputSize: '15px',
            baseLabelSize: '14px',
            baseButtonSize: '16px',
        },
        fonts: {
            bodyFontFamily: `ui-sans-serif, sans-serif`,
            buttonFontFamily: `ui-sans-serif, sans-serif`,
            inputFontFamily: `ui-sans-serif, sans-serif`,
            labelFontFamily: `ui-sans-serif, sans-serif`,
        },
        // fontWeights: {},
        // lineHeights: {},
        // letterSpacings: {},
        // sizes: {},
        borderWidths: {
            buttonBorderWidth: '1px',
            inputBorderWidth: '1px',
        },
        // borderStyles: {},
        radii: {
            borderRadiusButton: '6px',
            buttonBorderRadius: '5px',
            inputBorderRadius: '5px',
        },
        // shadows: {},
        // zIndices: {},
        // transitions: {},
    },
}

function Login() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-picton-blue-100 py-8">
            <div className="w-[87.5%] rounded-[12px] border-2 border-mako-grey-200 bg-picton-blue-50 p-8 shadow-md phone:w-1/2 phone:p-10 tab-port:w-2/5 tab-port:p-12 tab-land:w-1/3 tab-land:p-16 particular-small-laptop:w-[30%] particular-small-laptop:p-24">
                <Logo></Logo>
                <p className="mb-10 mt-10 text-center">
                    Take a look at the next flashcards app
                </p>
                <Auth
                    providers={['google']}
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa, variables: customTheme }}
                />
            </div>
        </div>
    )
}

export default Login

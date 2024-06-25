import { Auth } from '@supabase/auth-ui-react'

import { ThemeVariables, ThemeSupa } from '@supabase/auth-ui-shared'
import supabase from '@/services/supabase'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

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
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    useEffect(
        function () {
            supabase.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_IN') {
                    queryClient.setQueryData(['user'], session?.user)
                    navigate('/dashboard', { replace: true })
                } else return
            })
        },
        [navigate, queryClient]
    )

    return (
        <Auth
            providers={[]}
            supabaseClient={supabase}
            appearance={{
                theme: ThemeSupa,
                variables: customTheme,
            }}
        />
    )
}

export default Login

"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RealtimeProvider } from "@upstash/realtime/client"
import { ThemeProvider } from "@/lib/providers/theme-provider"

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <RealtimeProvider>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </RealtimeProvider>
        </ThemeProvider>
    )
}
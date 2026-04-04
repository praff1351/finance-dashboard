'use client'

import React, { useState } from 'react'
import { useUserStore } from '@/stores/use-user-store'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { User, Mail, ShieldCheck, UserCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Role = string

const ROLES: { value: Role; label: string; description: string; icon: React.ReactNode }[] = [
    {
        value: 'admin',
        label: 'Admin',
        description: 'Full access to all settings and user management.',
        icon: <ShieldCheck className="h-4 w-4" />,
    },
    {
        value: 'user',
        label: 'Normal User',
        description: 'Standard access with limited permissions.',
        icon: <UserCircle2 className="h-4 w-4" />,
    },
]

const SettingsPage = () => {
    const { name, email, avatarUrl, role: storeRole, updateUser } = useUserStore()

    const [formData, setFormData] = useState(() => ({
        name,
        email,
        role: storeRole,
    }))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const handleSave = () => {
        if (!formData.name || !formData.email) {
            toast.error('Please fill in all fields')
            return
        }
        updateUser({ name: formData.name, email: formData.email, role: formData.role })
        toast.success('Profile updated successfully')
    }

    const initials = formData.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 space-y-5 animate-in fade-in duration-500">

            {/* Header */}
            <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    Profile Settings
                </h1>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                    Update your personal info and role.
                </p>
            </div>

            <Card className="border-border shadow-sm overflow-hidden">

                <CardHeader className="border-b border-border pb-4">
                    <CardTitle className="text-sm sm:text-base">Public Profile</CardTitle>
                    <CardDescription className="text-[11px] sm:text-xs">
                        This information will be shown on your personal dashboard.
                    </CardDescription>
                </CardHeader>

                <CardContent className="pt-5 space-y-5">

                    {/* Avatar Section */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <Avatar className="h-14 w-14 sm:h-16 sm:w-16 border-2 border-border shadow-sm">
                            <AvatarImage src={avatarUrl} alt={name} />
                            <AvatarFallback className="text-base sm:text-lg bg-linear-to-br from-primary to-primary/80 text-primary-foreground font-bold">
                                {initials}
                            </AvatarFallback>
                        </Avatar>

                        <div className="space-y-1 w-full">
                            <p className="text-[11px] sm:text-xs text-muted-foreground">
                                PNG, JPG or GIF. Max 2MB.
                            </p>

                            <div className="flex flex-wrap gap-2">
                                <Button variant="outline" size="sm" className="h-7 text-xs">
                                    Change
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 text-xs text-red-500 hover:bg-red-50"
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Name */}
                    <div className="grid gap-1.5">
                        <Label htmlFor="name" className="text-sm font-medium">
                            Full Name
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="name"
                                className="pl-9"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="grid gap-1.5">
                        <Label htmlFor="email" className="text-sm font-medium">
                            Email Address
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                className="pl-9"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Role Selector */}
                    <div className="grid gap-2">
                        <Label className="text-sm font-medium">Role</Label>

                        {/* 🔥 Responsive grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {ROLES.map(r => (
                                <button
                                    key={r.value}
                                    type="button"
                                    onClick={() =>
                                        setFormData(prev => ({ ...prev, role: r.value }))
                                    }
                                    className={cn(
                                        'flex flex-col items-start gap-1 rounded-lg border p-3 text-left text-sm transition-all',
                                        formData.role === r.value
                                            ? 'border-primary bg-primary/10 text-primary shadow-sm'
                                            : 'border-border bg-background text-muted-foreground hover:border-primary/30 hover:bg-muted/50'
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'flex items-center gap-1.5 font-medium',
                                            formData.role === r.value
                                                ? 'text-primary'
                                                : 'text-foreground'
                                        )}
                                    >
                                        {r.icon}
                                        {r.label}
                                    </span>
                                    <span className="text-[11px] leading-snug text-muted-foreground">
                                        {r.description}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </CardContent>

                {/* Footer */}
                <CardFooter className="bg-muted/40 border-t border-border flex flex-col sm:flex-row justify-end gap-2 py-3">

                    <Button
                        variant="ghost"
                        className="w-full sm:w-auto"
                        onClick={() => setFormData({ name, email, role: storeRole })}
                    >
                        Cancel
                    </Button>

                    <Button
                        className="w-full sm:w-auto shadow-md shadow-primary/20"
                        onClick={handleSave}
                    >
                        Save Changes
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default SettingsPage
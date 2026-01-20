'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
	name: string
}

const Page = () => {
	const [loading, setLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data)
	}
	return (
		<div className='p-4 min-h-[calc(100dvh-4.5rem)] grid place-items-center'>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8 max-w-md w-full border border-zinc-800 p-5 rounded-md bg-zinc-900/50 backdrop-blur-md'>
				<p className='font-semibold text-xl'>Your Identity</p>
				<input {...register("name")} className='font-lexend-deca font-medium border border-zinc-800 p-2 rounded-lg' />
				<Button type='submit' className='font-bold text-lg'>Create Secure Room</Button>
			</form>
		</div>
	)
}

export default Page
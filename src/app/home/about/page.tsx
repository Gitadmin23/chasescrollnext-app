"use client"
import React from 'react'
import Header from '../home_component/Home/Header'
import { ABOUT_HEADER } from '@/constants'
import Main from '../home_component/About/Main'
import Footer from '../home_component/About/Footer'
import Template1 from '../home_component/Template1'

interface Props { }

function About(props: Props) {
    const { } = props

    return (

        <div className="  max-w-[1200px] w-full mx-auto flex flex-col gap-8">
            <Header data={ABOUT_HEADER} />
            <Main />
            <Footer />
            <Template1 containerClassName="mb-20" />
        </div>
    )
}

export default About

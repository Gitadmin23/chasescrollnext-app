"use client"
import React from 'react'
import Template1 from '../home_component/Template1'
import Header from '../home_component/Contact/Header'

interface Props { }

function Contact(props: Props) {
    const { } = props

    return ( 
        <div className=" lg:pt-16  mb-40 max-w-[1200px] w-full mx-auto flex flex-col gap-8">
            <Header />
            <Template1 containerClassName="footer-card-shadow" />
        </div>
    )
}

export default Contact

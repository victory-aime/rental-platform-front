import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { sender, subject, message } = await req.json()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_GOOGLE_EMAIL,
        pass: process.env.NEXT_PUBLIC_GOOGLE_PASSWORD,
      },
    })
    const mailOptions = {
      from: `"${sender.name}" <${sender?.email}>`,
      to: process.env.NEXT_PUBLIC_GOOGLE_EMAIL,
      replyTo: sender?.email,
      subject,
      text: `
      Message reçu :
      ${message}
      `,
    }
    await transporter.sendMail(mailOptions)
    return new NextResponse(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    return new NextResponse(JSON.stringify({ success: false }), {
      status: 500,
    })
  }
}

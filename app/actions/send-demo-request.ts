'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

// Use your verified domain
const FROM_EMAIL = 'Prepdha <demo@prepdha.school>';

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(2, { message: 'Last name is required' }),
  schoolName: z.string().min(3, { message: 'School name is required' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  phone: z.string().min(10, { message: 'Phone number is required (at least 10 digits)' }),
  title: z.string().min(2, { message: 'Job title is required' }),
});

export async function sendDemoRequest(prevState: any, formData: FormData) {
  const rawData = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    schoolName: formData.get('schoolName') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    title: formData.get('title') as string,
  };

  const validated = formSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      success: false,
      error: validated.error.flatten().fieldErrors,
      message: 'Please complete all required fields correctly.',
    };
  }

  const { firstName, lastName, schoolName, email, phone, title } = validated.data;
  const fullName = `${firstName} ${lastName}`;

  // Test/fallback mode (no API key)
  if (!process.env.RESEND_API_KEY) {
    console.log('TEST MODE: Simulating email send...');
    console.log('Would send to:', ['lokeshrevalla@prepdha.com', 'lokeshrevalla3@gmail.com']);
    console.log('From:', FROM_EMAIL);
    console.log('Subject:', `New School Demo Request: ${schoolName}`);
    await new Promise((r) => setTimeout(r, 1500));
    return {
      success: true,
      message: '(TEST MODE) Demo request received successfully!',
    };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ['lokeshrevalla@prepdha.com', 'lokeshrevalla3@gmail.com'],
      replyTo: email,
      subject: `[Prepdha Demo Request] ${schoolName} - ${fullName}`,
      text: `
New School Demo Request Received!

First Name: ${firstName}
Last Name: ${lastName}
Job Title: ${title}
School: ${schoolName}
Email: ${email}
Phone/WhatsApp: ${phone}

Reply directly or contact them at ${email} / ${phone}.
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #7c3aed;">New School Demo Request</h2>
          <p><strong>First Name:</strong> ${firstName}</p>
          <p><strong>Last Name:</strong> ${lastName}</p>
          <p><strong>Job Title:</strong> ${title}</p>
          <p><strong>School:</strong> ${schoolName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone/WhatsApp:</strong> ${phone}</p>
          <hr style="border-color: #e0e0e0;" />
          <p style="color: #666; font-size: 14px;">
            Reply to this email or contact the school directly at <a href="mailto:${email}">${email}</a> / ${phone}
          </p>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            Sent via Prepdha.ai – AI-Powered CBSE Learning Platform
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend send error:', error);
      return {
        success: false,
        message: `Failed to send email: ${error.message || 'Unknown error'}. Please try again or contact support.`,
      };
    }

    console.log('Email sent successfully:', data?.id);
    return {
      success: true,
      message: 'Thank you! Your demo request has been sent successfully. Our team will contact you within 24 hours to schedule.',
    };
  } catch (err) {
    console.error('Unexpected server error:', err);
    return {
      success: false,
      message: 'A server error occurred. Please try again later or reach out directly.',
    };
  }
}

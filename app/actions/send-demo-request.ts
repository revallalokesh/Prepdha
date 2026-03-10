'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

// Use your verified domain
const FROM_EMAIL = 'Prepdha <demo@prepdha.school>'; // ← Change to your verified one

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name is required (at least 2 characters)' }),
  schoolName: z.string().min(3, { message: 'School name is required' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  phone: z.string().min(10, { message: 'Phone/WhatsApp number is required (at least 10 digits)' }),
  message: z.string().optional(),
});

export async function sendDemoRequest(prevState: any, formData: FormData) {
  const rawData = {
    name: formData.get('name') as string,
    schoolName: formData.get('schoolName') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    message: formData.get('message') as string | undefined,
  };

  const validated = formSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      success: false,
      error: validated.error.flatten().fieldErrors,
      message: 'Please complete all required fields correctly.',
    };
  }

  // Test/fallback mode (no API key)
  if (!process.env.RESEND_API_KEY) {
    console.log('TEST MODE: Simulating email send...');
    console.log('Would send to:', ['lokeshrevalla@prepdha.com', 'lokeshrevalla3@gmail.com']);
    console.log('From:', FROM_EMAIL);
    console.log('Subject:', `New School Demo Request: ${validated.data.schoolName}`);
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
      replyTo: validated.data.email,
      subject: `[Prepdha Demo Request] New from ${validated.data.schoolName}`,
      text: `
New School Demo Request Received!

Name: ${validated.data.name}
School: ${validated.data.schoolName}
Email: ${validated.data.email}
Phone/WhatsApp: ${validated.data.phone}
Message: ${validated.data.message || 'None'}

Reply directly or contact them at ${validated.data.email} / ${validated.data.phone}.
      `,
      // Optional: Add simple HTML version (recommended)
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #7c3aed;">New School Demo Request</h2>
          <p><strong>Name:</strong> ${validated.data.name}</p>
          <p><strong>School:</strong> ${validated.data.schoolName}</p>
          <p><strong>Email:</strong> ${validated.data.email}</p>
          <p><strong>Phone/WhatsApp:</strong> ${validated.data.phone}</p>
          <p><strong>Message:</strong> ${validated.data.message || 'None'}</p>
          <hr style="border-color: #e0e0e0;" />
          <p style="color: #666; font-size: 14px;">
            Reply to this email or contact the school directly at <a href="mailto:${validated.data.email}">${validated.data.email}</a> / ${validated.data.phone}
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



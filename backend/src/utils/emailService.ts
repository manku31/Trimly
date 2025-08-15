import nodemailer from "nodemailer";

export class EmailService {
  private static transporter = nodemailer.createTransport({
    service: "gmail", // or your email provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // Use app password for Gmail
    },
  });

  // Generate 6-digit OTP
  static generateOtp(): string {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  }

  // Send OTP email
  static async sendOTPEmail(
    email: string,
    otp: string,
    name: string
  ): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify Your Trimly Account - OTP",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Welcome to Trimly!</h2>
            <p>Hi ${name},</p>
            <p>Thank you for creating an account with Trimly. To complete your registration, please verify your email address using the OTP below:</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px;">
              <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
            </div>
            
            <p>This OTP will expire in 10 minutes.</p>
            <p>If you didn't create this account, please ignore this email.</p>
            
            <hr style="margin: 30px 0;">
            <p style="color: #666; font-size: 12px;">
              This is an automated email, please do not reply to this message.
            </p>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error("Error sending OTP email:", error);
      return false;
    }
  }

  // Calculate OTP expiry (10 minutes from now)
  static getOTPExpiry(): Date {
    return new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  }

  // Check if OTP is expired
  static isOTPExpired(expiry: Date): boolean {
    return new Date() > expiry;
  }
}

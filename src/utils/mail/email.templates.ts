
export const WELCOME_EMAIL_TEMPLATE = (name: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bem-vindo ao Salon , ${name}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Bem-vindo ao Salon!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Olá,${name}</p>
    <p>Obrigado por se cadastrar no Salon!</p>
    <p>Estamos muito felizes em tê-lo(a) como parte da nossa comunidade. Agora você pode começar a aproveitar todos os serviços incríveis que oferecemos.</p>
    <p>Se você tiver alguma dúvida ou precisar de ajuda, nossa equipe está sempre à disposição para ajudá-lo(a)!</p>
    <p>Desejamos uma experiência maravilhosa na nossa plataforma!</p>
    <p>Atenciosamente,<br>Equipe Salon</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Este é um e-mail automatizado. Por favor, não responda a este e-mail.</p>
  </div>
</body>
</html>
`;

export const APPOINTMENT_CONFIRMATION_EMAIL_TEMPLATE = (name: string, appointmentDate: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Seu agendamento foi confirmado, ${name}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Agendamento Confirmado</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Olá, ${name}</p>
    <p>Obrigado por agendar seu compromisso conosco no Salon!</p>
    <p>Seu agendamento foi confirmado com sucesso e está marcado para:</p>
    <p><strong>${appointmentDate}</strong></p>
    <p>Fique tranquilo(a), nossa equipe estará pronta para atendê-lo(a) no horário marcado.</p>
    <p>Se precisar alterar ou cancelar o agendamento, entre em contato conosco com antecedência.</p>
    <p>Estamos ansiosos para vê-lo(a) em breve!</p>
    <p>Atenciosamente,<br>Equipe Salon</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Este é um e-mail automatizado. Por favor, não responda a este e-mail.</p>
  </div>
</body>
</html>
`;


export const CANCEL_APPOINTMENT_EMAIL_TEMPLATE = (name: string, appointmentDate: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Seu agendamento foi cancelado, ${name}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #F44336, #D32F2F); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Agendamento Cancelado</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Olá, ${name}</p>
    <p>Informamos que o seu agendamento foi cancelado com sucesso. O agendamento estava marcado para:</p>
    <p><strong>${appointmentDate}</strong></p>
    <p>Se o cancelamento foi feito por engano ou se você deseja reagendar, por favor, entre em contato conosco o mais rápido possível.</p>
    <p>Se precisar de mais informações ou ajuda, nossa equipe está disponível para te atender.</p>
    <p>Agradecemos pela sua compreensão e esperamos atendê-lo(a) em uma próxima oportunidade.</p>
    <p>Atenciosamente,<br>Equipe Salon</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Este é um e-mail automatizado. Por favor, não responda a este e-mail.</p>
  </div>
</body>
</html>
`;


export const BLOCK_USER_EMAIL_TEMPLATE = (name: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title> conta bloqueada, ${name}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #F44336, #D32F2F); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Sua Conta foi Bloqueada</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Olá, ${name}</p>
    <p>Sentimos muito em informar que sua conta foi cancelada com sucesso.</p>
    <p>Se você não solicitou este bloqueio ou se deseja reverter a decisão, entre em contato com nossa equipe o mais rápido possível.</p>
    <p>Se precisar de ajuda ou se tiver alguma dúvida, nossa equipe de suporte está à disposição.</p>
    <p>Esperamos poder contar com você novamente no futuro.</p>
    <p>Atenciosamente,<br>Equipe Salon</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Este é um e-mail automatizado. Por favor, não responda a este e-mail.</p>
  </div>
</body>
</html>
`;

export const UNBLOCK_USER_EMAIL_TEMPLATE = (name: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Conta Desbloqueada, ${name}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #388E3C); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Sua Conta foi Desbloqueada!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Olá, ${name}</p>
    <p>Temos o prazer de informar que sua conta foi desbloqueada com sucesso!</p>
    <p>Agora você pode acessar todos os serviços novamente. Estamos felizes em tê-lo(a) de volta à nossa plataforma.</p>
    <p>Se precisar de ajuda ou tiver alguma dúvida, nossa equipe de suporte está à disposição para assisti-lo(a) a qualquer momento.</p>
    <p>Obrigado por continuar com a gente! Desejamos uma experiência excelente em nossa plataforma.</p>
    <p>Atenciosamente,<br>Equipe Salon</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Este é um e-mail automatizado. Por favor, não responda a este e-mail.</p>
  </div>
</body>
</html>
`;


export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
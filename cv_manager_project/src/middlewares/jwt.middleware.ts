import { NestMiddleware } from '@nestjs/common';

export class JwtMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void): any {

    // Récupérer le header Authorization
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token manquant' });
    }

    const token = authHeader.split(' ')[1];

    try {
      // Décoder le payload JWT sans vérifier la signature (simulation)
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(
        Buffer.from(payloadBase64, 'base64').toString('utf-8'),
      );

      // Attacher le payload décodé à la requête
      req.user = payload;

      console.log('User from token:', req.user);

      next();
    } catch (e) {
      return res.status(401).json({ message: 'Token invalide' });
    }
  }
}

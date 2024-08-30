import jwt from "jsonwebtoken";
import 'dotenv/config';
import { IJwt } from "../../usecase/usecase/interface/services/IJwt";
import { DecodedToken } from "../../domain/types/decodedToken";
import ErrorResponse from "../../usecase/handler/errorResponse";


export class GenerateToken implements IJwt{

    private readonly accessJwtKey = process.env.ACCESS_JWT_KEY || "";
    private readonly refreshJwtKey = process.env.REFRESH_JWT_KEY || "";   

    generateJWT(_id: string, name: string): { accessTkn: string, refreshTkn: string } {

        if (this.accessJwtKey && this.refreshJwtKey) {

          const accessTkn: string = jwt.sign(
            { userId: _id },
            this.accessJwtKey,
            { expiresIn: '10d' }
          );

          const refreshTkn: string = jwt.sign(
            { userId: _id },
            this.refreshJwtKey,
            { expiresIn: '30d' }
          );
        
          return { accessTkn, refreshTkn };
        }
        throw new Error("JWT_KEY is not defined");
    }
    
    verifyJWT(token: string, type: string): Promise<string> {
      return new Promise((resolve, reject) => {
          const secretKey = type === "access" ? this.accessJwtKey : this.refreshJwtKey;

          jwt.verify(token, secretKey, (err, decoded) => {
              if (err) {
                  return reject(ErrorResponse.badRequest("Token not verified"));
              }

              // Type assertion to ensure that decoded is of type DecodedToken
              const decodedToken = decoded as DecodedToken;          
              
              console.log(decodedToken);
              

              if (!decodedToken.userId) {
                  return reject(ErrorResponse.badRequest("Invalid token structure"));
              }

              resolve(decodedToken.userId);
          });
      });
  }
}

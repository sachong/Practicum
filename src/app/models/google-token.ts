
export interface GoogleToken {
    access_type: String; 
    audience: String; 
    email: String; 
    expires_in: number; 
    issued_to: String; 
    scope: String; 
    user_id: String; 
    verified_email: boolean; 
    refresh_token: String; 
}
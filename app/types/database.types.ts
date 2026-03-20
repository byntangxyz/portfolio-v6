export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      guestbook_entries: {
        Row: {
          id: string;
          user_id: string;
          user_name: string;
          user_email: string;
          avatar_url: string | null;
          message: string;
          created_at: string;
          is_approved: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          user_name: string;
          user_email: string;
          avatar_url?: string | null;
          message: string;
          created_at?: string;
          is_approved?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          user_name?: string;
          user_email?: string;
          avatar_url?: string | null;
          message?: string;
          created_at?: string;
          is_approved?: boolean;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

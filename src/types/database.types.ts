export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          addDetail: string;
          address: string;
          default: string;
          id: string;
          name: string;
          request: string | null;
          tel: string;
          userId: string | null;
          zipcode: string;
        };
        Insert: {
          addDetail: string;
          address: string;
          default: string;
          id?: string;
          name: string;
          request?: string | null;
          tel: string;
          userId?: string | null;
          zipcode: string;
        };
        Update: {
          addDetail?: string;
          address?: string;
          default?: string;
          id?: string;
          name?: string;
          request?: string | null;
          tel?: string;
          userId?: string | null;
          zipcode?: string;
        };
        Relationships: [
          {
            foreignKeyName: "addresses_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      admins: {
        Row: {
          adminId: string;
          adminPwd: string;
          createdAt: string;
          email: string;
          id: string;
          name: string;
          role: string;
          updatedAt: string | null;
        };
        Insert: {
          adminId: string;
          adminPwd: string;
          createdAt?: string;
          email: string;
          id?: string;
          name: string;
          role: string;
          updatedAt?: string | null;
        };
        Update: {
          adminId?: string;
          adminPwd?: string;
          createdAt?: string;
          email?: string;
          id?: string;
          name?: string;
          role?: string;
          updatedAt?: string | null;
        };
        Relationships: [];
      };
      brands: {
        Row: {
          createdAt: string;
          description: string;
          id: string;
          name: string;
          updatedAt: string | null;
        };
        Insert: {
          createdAt: string;
          description: string;
          id?: string;
          name: string;
          updatedAt?: string | null;
        };
        Update: {
          createdAt?: string;
          description?: string;
          id?: string;
          name?: string;
          updatedAt?: string | null;
        };
        Relationships: [];
      };
      carts: {
        Row: {
          count: number;
          date: string;
          id: string;
          ProductId: string;
          userId: string;
        };
        Insert: {
          count?: number;
          date: string;
          id?: string;
          ProductId: string;
          userId: string;
        };
        Update: {
          count?: number;
          date?: string;
          id?: string;
          ProductId?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Cart_ProductId_fkey";
            columns: ["ProductId"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "carts_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      categories: {
        Row: {
          code: string;
          created_at: string | null;
          id: string;
          name: string;
          parent_id: string | null;
          type: string;
          updated_at: string | null;
        };
        Insert: {
          code: string;
          created_at?: string | null;
          id: string;
          name: string;
          parent_id?: string | null;
          type: string;
          updated_at?: string | null;
        };
        Update: {
          code?: string;
          created_at?: string | null;
          id?: string;
          name?: string;
          parent_id?: string | null;
          type?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
      comments: {
        Row: {
          aminId: string | null;
          author: string;
          content: string;
          createdAt: string;
          id: string;
          parentCommentId: string | null;
          productId: string;
          updatedAt: string;
        };
        Insert: {
          aminId?: string | null;
          author: string;
          content: string;
          createdAt?: string;
          id?: string;
          parentCommentId?: string | null;
          productId: string;
          updatedAt?: string;
        };
        Update: {
          aminId?: string | null;
          author?: string;
          content?: string;
          createdAt?: string;
          id?: string;
          parentCommentId?: string | null;
          productId?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Comment_aminId_fkey";
            columns: ["aminId"];
            isOneToOne: false;
            referencedRelation: "admins";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Comment_parentCommentId_fkey";
            columns: ["parentCommentId"];
            isOneToOne: false;
            referencedRelation: "comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Comment_productId_fkey";
            columns: ["productId"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_author_fkey";
            columns: ["author"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      coupons: {
        Row: {
          code: string;
          createdAt: string;
          discountPercentage: number;
          id: string;
          updatedAt: string | null;
          usageLimit: number | null;
          usedCount: number;
          validFrom: string;
          validTo: string;
        };
        Insert: {
          code: string;
          createdAt?: string;
          discountPercentage: number;
          id?: string;
          updatedAt?: string | null;
          usageLimit?: number | null;
          usedCount?: number;
          validFrom: string;
          validTo: string;
        };
        Update: {
          code?: string;
          createdAt?: string;
          discountPercentage?: number;
          id?: string;
          updatedAt?: string | null;
          usageLimit?: number | null;
          usedCount?: number;
          validFrom?: string;
          validTo?: string;
        };
        Relationships: [];
      };
      inquiries: {
        Row: {
          created_at: string;
          createdAt: string;
          id: string;
          message: string;
          status: string;
          subject: string;
          updatedAt: string | null;
          userId: string;
        };
        Insert: {
          created_at?: string;
          createdAt?: string;
          id?: string;
          message: string;
          status: string;
          subject: string;
          updatedAt?: string | null;
          userId: string;
        };
        Update: {
          created_at?: string;
          createdAt?: string;
          id?: string;
          message?: string;
          status?: string;
          subject?: string;
          updatedAt?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "inquiries_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      inquiryReplies: {
        Row: {
          adminId: string;
          createdAt: string;
          id: string;
          inquiryId: string;
          message: string;
          updatedAt: string | null;
        };
        Insert: {
          adminId: string;
          createdAt?: string;
          id?: string;
          inquiryId: string;
          message: string;
          updatedAt?: string | null;
        };
        Update: {
          adminId?: string;
          createdAt?: string;
          id?: string;
          inquiryId?: string;
          message?: string;
          updatedAt?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "InquiryReplies_adminId_fkey";
            columns: ["adminId"];
            isOneToOne: false;
            referencedRelation: "admins";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "InquiryReplies_inquiryId_fkey";
            columns: ["inquiryId"];
            isOneToOne: false;
            referencedRelation: "inquiries";
            referencedColumns: ["id"];
          }
        ];
      };
      orderDetails: {
        Row: {
          id: string;
          orderId: string;
          price: number;
          productId: string;
          productImages: string[];
          quantity: number;
          refundReason: string | null;
        };
        Insert: {
          id?: string;
          orderId: string;
          price: number;
          productId: string;
          productImages: string[];
          quantity: number;
          refundReason?: string | null;
        };
        Update: {
          id?: string;
          orderId?: string;
          price?: number;
          productId?: string;
          productImages?: string[];
          quantity?: number;
          refundReason?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "OrderDetail_orderId_fkey";
            columns: ["orderId"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "OrderDetail_productId_fkey";
            columns: ["productId"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      orders: {
        Row: {
          cardCompany: string | null;
          contactNumber: number;
          createdAt: string;
          id: string;
          name: string;
          orderQuantity: number;
          payment: string;
          refundReason: string | null;
          shippingAddress: string;
          status: string | null;
          totalAmount: number;
          updatedAt: string | null;
          userId: string | null;
        };
        Insert: {
          cardCompany?: string | null;
          contactNumber: number;
          createdAt?: string;
          id?: string;
          name: string;
          orderQuantity: number;
          payment: string;
          refundReason?: string | null;
          shippingAddress: string;
          status?: string | null;
          totalAmount: number;
          updatedAt?: string | null;
          userId?: string | null;
        };
        Update: {
          cardCompany?: string | null;
          contactNumber?: number;
          createdAt?: string;
          id?: string;
          name?: string;
          orderQuantity?: number;
          payment?: string;
          refundReason?: string | null;
          shippingAddress?: string;
          status?: string | null;
          totalAmount?: number;
          updatedAt?: string | null;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "orders_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      products: {
        Row: {
          categoryId: string;
          coupon: string | null;
          createdAt: string;
          deleted: string;
          description: string;
          discoutRate: number;
          id: string;
          imageUrls: string[] | null;
          name: string;
          price: number;
          stockQuantity: number;
          thumbnaiIUrls: string[] | null;
          updatedAt: string;
        };
        Insert: {
          categoryId?: string;
          coupon?: string | null;
          createdAt: string;
          deleted?: string;
          description: string;
          discoutRate: number;
          id?: string;
          imageUrls?: string[] | null;
          name: string;
          price: number;
          stockQuantity: number;
          thumbnaiIUrls?: string[] | null;
          updatedAt: string;
        };
        Update: {
          categoryId?: string;
          coupon?: string | null;
          createdAt?: string;
          deleted?: string;
          description?: string;
          discoutRate?: number;
          id?: string;
          imageUrls?: string[] | null;
          name?: string;
          price?: number;
          stockQuantity?: number;
          thumbnaiIUrls?: string[] | null;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Product_coupon_fkey";
            columns: ["coupon"];
            isOneToOne: false;
            referencedRelation: "coupons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_categoryId_fkey";
            columns: ["categoryId"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
      reviews: {
        Row: {
          comment: string;
          createdAt: string;
          id: number;
          images: string[];
          productId: string;
          rating: number;
          updatedAt: string | null;
          userId: string;
        };
        Insert: {
          comment: string;
          createdAt?: string;
          id?: number;
          images: string[];
          productId: string;
          rating: number;
          updatedAt?: string | null;
          userId: string;
        };
        Update: {
          comment?: string;
          createdAt?: string;
          id?: number;
          images?: string[];
          productId?: string;
          rating?: number;
          updatedAt?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Review_productId_fkey";
            columns: ["productId"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reviews_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          email: string | null;
          id: string;
          image: string | null;
          name: string;
          password: string | null;
          phone: string | null;
          provider: string | null;
          providerId: string | null;
          signout: string;
          signupDate: string;
        };
        Insert: {
          email?: string | null;
          id?: string;
          image?: string | null;
          name: string;
          password?: string | null;
          phone?: string | null;
          provider?: string | null;
          providerId?: string | null;
          signout?: string;
          signupDate?: string;
        };
        Update: {
          email?: string | null;
          id?: string;
          image?: string | null;
          name?: string;
          password?: string | null;
          phone?: string | null;
          provider?: string | null;
          providerId?: string | null;
          signout?: string;
          signupDate?: string;
        };
        Relationships: [];
      };
      wishes: {
        Row: {
          createdAt: string;
          id: string;
          productId: string;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          id?: string;
          productId: string;
          userId: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          productId?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Wish_productId_fkey";
            columns: ["productId"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Wish_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
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
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

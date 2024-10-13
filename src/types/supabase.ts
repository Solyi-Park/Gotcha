export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      addresses: {
        Row: {
          address: string;
          addressDetail: string;
          contact1: string;
          contact2: string | null;
          default: boolean | null;
          deliveryNote: string;
          fullname: string;
          id: string;
          postalCode: string;
          userId: string | null;
        };
        Insert: {
          address: string;
          addressDetail?: string;
          contact1: string;
          contact2?: string | null;
          default?: boolean | null;
          deliveryNote?: string;
          fullname: string;
          id?: string;
          postalCode: string;
          userId?: string | null;
        };
        Update: {
          address?: string;
          addressDetail?: string;
          contact1?: string;
          contact2?: string | null;
          default?: boolean | null;
          deliveryNote?: string;
          fullname?: string;
          id?: string;
          postalCode?: string;
          userId?: string | null;
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
          createdAt: string;
          id: string;
          option: Json;
          productId: string;
          quantity: number | null;
          updatedAt: string | null;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          id?: string;
          option?: Json;
          productId: string;
          quantity?: number | null;
          updatedAt?: string | null;
          userId: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          option?: Json;
          productId?: string;
          quantity?: number | null;
          updatedAt?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Cart_ProductId_fkey";
            columns: ["productId"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      categories: {
        Row: {
          code: number;
          createdAt: string | null;
          id: string;
          name: string;
          parentId: string | null;
          type: string;
          updatedAt: string | null;
        };
        Insert: {
          code: number;
          createdAt?: string | null;
          id: string;
          name: string;
          parentId?: string | null;
          type: string;
          updatedAt?: string | null;
        };
        Update: {
          code?: number;
          createdAt?: string | null;
          id?: string;
          name?: string;
          parentId?: string | null;
          type?: string;
          updatedAt?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey";
            columns: ["parentId"];
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
      orderItems: {
        Row: {
          id: string;
          option: Json | null;
          orderId: string;
          price: number;
          productId: string;
          quantity: number;
        };
        Insert: {
          id?: string;
          option?: Json | null;
          orderId: string;
          price: number;
          productId: string;
          quantity: number;
        };
        Update: {
          id?: string;
          option?: Json | null;
          orderId?: string;
          price?: number;
          productId?: string;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: "orderDetail_orderId_fkey";
            columns: ["orderId"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["orderId"];
          },
          {
            foreignKeyName: "orderDetail_productId_fkey";
            columns: ["productId"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      orders: {
        Row: {
          contact1: string;
          contact2: string | null;
          createdAt: string;
          customDeliveryNote: string | null;
          deliveryNote: string | null;
          fullAddress: string;
          isDefault: boolean;
          orderId: string;
          orderQuantity: number;
          paymentKey: string | null;
          recipient: string;
          refundReason: string | null;
          shippingCost: number;
          status: string | null;
          totalAmount: number;
          updatedAt: string | null;
          userId: string;
        };
        Insert: {
          contact1: string;
          contact2?: string | null;
          createdAt?: string;
          customDeliveryNote?: string | null;
          deliveryNote?: string | null;
          fullAddress: string;
          isDefault?: boolean;
          orderId?: string;
          orderQuantity: number;
          paymentKey?: string | null;
          recipient: string;
          refundReason?: string | null;
          shippingCost: number;
          status?: string | null;
          totalAmount: number;
          updatedAt?: string | null;
          userId: string;
        };
        Update: {
          contact1?: string;
          contact2?: string | null;
          createdAt?: string;
          customDeliveryNote?: string | null;
          deliveryNote?: string | null;
          fullAddress?: string;
          isDefault?: boolean;
          orderId?: string;
          orderQuantity?: number;
          paymentKey?: string | null;
          recipient?: string;
          refundReason?: string | null;
          shippingCost?: number;
          status?: string | null;
          totalAmount?: number;
          updatedAt?: string | null;
          userId?: string;
        };
        Relationships: [];
      };
      payments: {
        Row: {
          approvedAt: string;
          card: Json | null;
          createdAt: string;
          easyPay: Json | null;
          method: string;
          orderId: string;
          orderName: string;
          paymentKey: string;
          receipt: string;
          totalAmount: number;
          transfer: Json | null;
        };
        Insert: {
          approvedAt: string;
          card?: Json | null;
          createdAt?: string;
          easyPay?: Json | null;
          method: string;
          orderId: string;
          orderName: string;
          paymentKey: string;
          receipt: string;
          totalAmount: number;
          transfer?: Json | null;
        };
        Update: {
          approvedAt?: string;
          card?: Json | null;
          createdAt?: string;
          easyPay?: Json | null;
          method?: string;
          orderId?: string;
          orderName?: string;
          paymentKey?: string;
          receipt?: string;
          totalAmount?: number;
          transfer?: Json | null;
        };
        Relationships: [];
      };
      productLikes: {
        Row: {
          productId: string;
          userId: string;
        };
        Insert: {
          productId: string;
          userId: string;
        };
        Update: {
          productId?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "productLikes_productId_fkey";
            columns: ["productId"];
            isOneToOne: true;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "productLikes_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      products: {
        Row: {
          categoryCode: string;
          createdAt: string;
          deleted: string;
          description: string;
          discountRate: number | null;
          id: string;
          imageUrls: string[];
          likes: string[];
          name: string;
          options: Json | null;
          price: number;
          stockQuantity: number;
          tags: string[];
          thumbnailUrls: string[];
          updatedAt: string | null;
        };
        Insert: {
          categoryCode: string;
          createdAt?: string;
          deleted?: string;
          description: string;
          discountRate?: number | null;
          id?: string;
          imageUrls: string[];
          likes?: string[];
          name: string;
          options?: Json | null;
          price: number;
          stockQuantity: number;
          tags?: string[];
          thumbnailUrls: string[];
          updatedAt?: string | null;
        };
        Update: {
          categoryCode?: string;
          createdAt?: string;
          deleted?: string;
          description?: string;
          discountRate?: number | null;
          id?: string;
          imageUrls?: string[];
          likes?: string[];
          name?: string;
          options?: Json | null;
          price?: number;
          stockQuantity?: number;
          tags?: string[];
          thumbnailUrls?: string[];
          updatedAt?: string | null;
        };
        Relationships: [];
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
      search_products_by_keyword: {
        Args: {
          keyword: string;
        };
        Returns: {
          total_count: number;
          products: Json;
        }[];
      };
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

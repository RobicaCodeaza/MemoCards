export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Card: {
        Row: {
          answers: string[]
          correctAnswer: number
          deckId: number
          id: number
          question: string
          user_id: string
        }
        Insert: {
          answers: string[]
          correctAnswer?: number
          deckId: number
          id?: number
          question: string
          user_id: string
        }
        Update: {
          answers?: string[]
          correctAnswer?: number
          deckId?: number
          id?: number
          question?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Card_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "Decks"
            referencedColumns: ["id"]
          },
        ]
      }
      Decks: {
        Row: {
          chapter: string
          id: number
          lastTested: string[] | null
          lesson: string
          perfectionScore: number[] | null
          subchapter: string
          user_id: string
        }
        Insert: {
          chapter: string
          id?: number
          lastTested?: string[] | null
          lesson: string
          perfectionScore?: number[] | null
          subchapter: string
          user_id: string
        }
        Update: {
          chapter?: string
          id?: number
          lastTested?: string[] | null
          lesson?: string
          perfectionScore?: number[] | null
          subchapter?: string
          user_id?: string
        }
        Relationships: []
      }
      Quizes: {
        Row: {
          completionTime: number | null
          decksId: number[]
          description: string | null
          id: number
          lastTested: string[] | null
          perfectionScore: number[] | null
          questionTime: number | null
          quizName: string
          quizTime: number | null
          user_id: string
        }
        Insert: {
          completionTime?: number | null
          decksId: number[]
          description?: string | null
          id?: number
          lastTested?: string[] | null
          perfectionScore?: number[] | null
          questionTime?: number | null
          quizName: string
          quizTime?: number | null
          user_id: string
        }
        Update: {
          completionTime?: number | null
          decksId?: number[]
          description?: string | null
          id?: number
          lastTested?: string[] | null
          perfectionScore?: number[] | null
          questionTime?: number | null
          quizName?: string
          quizTime?: number | null
          user_id?: string
        }
        Relationships: []
      }
      Settings: {
        Row: {
          future_exam_in_days: number | null
          id: number
          recap_weekstime_p100: number | null
          recap_weekstime_p25: number | null
          recap_weekstime_p50: number | null
          recap_weekstime_p75: number | null
          target_perfection_score: number | null
          user_id: string
        }
        Insert: {
          future_exam_in_days?: number | null
          id?: number
          recap_weekstime_p100?: number | null
          recap_weekstime_p25?: number | null
          recap_weekstime_p50?: number | null
          recap_weekstime_p75?: number | null
          target_perfection_score?: number | null
          user_id: string
        }
        Update: {
          future_exam_in_days?: number | null
          id?: number
          recap_weekstime_p100?: number | null
          recap_weekstime_p25?: number | null
          recap_weekstime_p50?: number | null
          recap_weekstime_p75?: number | null
          target_perfection_score?: number | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      append_completiondata_quiz: {
        Args: {
          row_id: number
          new_perfection_score: number
          new_last_tested: string
        }
        Returns: undefined
      }
      append_perfectionscore_quiz: {
        Args: {
          row_id: number
          new_element: number
        }
        Returns: undefined
      }
      append_to_array:
        | {
            Args: {
              row_id: number
              new_element: number
            }
            Returns: undefined
          }
        | {
            Args: {
              row_id: string
              new_element: number
            }
            Returns: undefined
          }
        | {
            Args: {
              row_id: string
              new_element: string
            }
            Returns: undefined
          }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export const COMMENT_ROLES = ["Öğrenci", "Veli", "Mezun", "Diğer"] as const;

export type CommentRole = (typeof COMMENT_ROLES)[number];
export type CommentStatus = "pending" | "approved" | "rejected";

export type PublicComment = {
  id: string;
  name: string;
  role: CommentRole;
  body: string;
  createdAt: string;
};

export type AdminComment = PublicComment & {
  status: CommentStatus;
  approvedAt: string | null;
};


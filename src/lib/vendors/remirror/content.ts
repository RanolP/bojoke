import { RemirrorContentType } from "@remirror/core";
import { Schema } from "prosemirror-model";

export type RemirrorContent = RemirrorContentType<Schema<string, string>>;

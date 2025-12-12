import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered, Quote, Code, Undo, Redo, Link2, Image as ImageIcon,
  Heading1, Heading2, Heading3
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-cyan-400 hover:underline',
        },
      }),
      Image,
      Underline,
      TextStyle,
      Color,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[400px] px-4 py-3',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="border border-slate-700 rounded-lg bg-slate-950 overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-slate-700 p-2 flex flex-wrap gap-1 bg-slate-900">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-slate-800 transition-colors ${
            editor.isActive('heading', { level: 1 }) ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'
          }`}
          title="Heading 1"
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-slate-800 transition-colors ${
            editor.isActive('heading', { level: 2 }) ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'
          }`}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-slate-800 transition-colors ${
            editor.isActive('heading', { level: 3 }) ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'
          }`}
          title="Heading 3"
        >
          <Heading3 size={18} />
        </button>

        <div className="w-px h-6 bg-slate-700 mx-1"></div>

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-slate-800 transition-colors ${
            editor.isActive('bold') ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'
          }`}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-slate-800 transition-colors ${
            editor.isActive('italic') ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'
          }`}
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-slate-800 transition-colors ${
            editor.isActive('underline') ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'
          }`}
          title="Underline"
        >
          <UnderlineIcon size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-slate-800 transition-colors ${
            editor.isActive('strike') ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'
          }`}
          title="Strikethrough"
        >
          <Strikethrough size={18} />
        </button>

        <div className="w-px h-6 bg-slate-700 mx-1"></div>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-slate-800 transition-colors ${
            editor.isActive('bulletList') ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'
          }`}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-slate-800 transition-colors ${
            editor.isActive('orderedList') ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'
          }`}
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-slate-800 transition-colors ${
            editor.isActive('blockquote') ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'
          }`}
          title="Quote"
        >
          <Quote size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-slate-800 transition-colors ${
            editor.isActive('codeBlock') ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'
          }`}
          title="Code Block"
        >
          <Code size={18} />
        </button>

        <div className="w-px h-6 bg-slate-700 mx-1"></div>

        <button
          onClick={addLink}
          className={`p-2 rounded hover:bg-slate-800 transition-colors ${
            editor.isActive('link') ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'
          }`}
          title="Add Link"
        >
          <Link2 size={18} />
        </button>
        <button
          onClick={addImage}
          className="p-2 rounded hover:bg-slate-800 transition-colors text-slate-400"
          title="Add Image"
        >
          <ImageIcon size={18} />
        </button>

        <div className="w-px h-6 bg-slate-700 mx-1"></div>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded hover:bg-slate-800 transition-colors text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Undo"
        >
          <Undo size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded hover:bg-slate-800 transition-colors text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Redo"
        >
          <Redo size={18} />
        </button>
      </div>

      {/* Editor */}
      <div className="editor-content">
        <EditorContent editor={editor} />
      </div>

      <style>{`
        .editor-content .ProseMirror {
          min-height: 400px;
          padding: 1rem;
          color: white;
          outline: none;
        }

        .editor-content .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
          color: #22d3ee;
        }

        .editor-content .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
          color: #22d3ee;
        }

        .editor-content .ProseMirror h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 0.83em 0;
          color: #22d3ee;
        }

        .editor-content .ProseMirror p {
          margin: 1em 0;
          line-height: 1.6;
        }

        .editor-content .ProseMirror strong {
          font-weight: bold;
        }

        .editor-content .ProseMirror em {
          font-style: italic;
        }

        .editor-content .ProseMirror u {
          text-decoration: underline;
        }

        .editor-content .ProseMirror s {
          text-decoration: line-through;
        }

        .editor-content .ProseMirror ul {
          list-style: disc;
          padding-left: 2em;
          margin: 1em 0;
        }

        .editor-content .ProseMirror ol {
          list-style: decimal;
          padding-left: 2em;
          margin: 1em 0;
        }

        .editor-content .ProseMirror li {
          margin: 0.5em 0;
        }

        .editor-content .ProseMirror blockquote {
          border-left: 4px solid #22d3ee;
          padding-left: 1em;
          margin: 1em 0;
          font-style: italic;
          color: #94a3b8;
        }

        .editor-content .ProseMirror code {
          background-color: #1e293b;
          padding: 0.2em 0.4em;
          border-radius: 0.25rem;
          font-family: monospace;
          font-size: 0.9em;
        }

        .editor-content .ProseMirror pre {
          background-color: #1e293b;
          padding: 1em;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1em 0;
        }

        .editor-content .ProseMirror pre code {
          background: none;
          padding: 0;
          font-size: 0.875em;
          color: #e2e8f0;
        }

        .editor-content .ProseMirror a {
          color: #22d3ee;
          text-decoration: underline;
        }

        .editor-content .ProseMirror a:hover {
          color: #06b6d4;
        }

        .editor-content .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1em 0;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;

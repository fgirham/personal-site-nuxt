<template>
  <PageContainer v-if="editor" :class="{ 'editor-page-dark': isDark }">
    <div class="control-group">
      <div class="button-group">
        <UButton
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
          @click="editor.chain().focus().toggleBold().run()"
        >
          Bold
        </UButton>
        <UButton
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          Italic
        </UButton>
        <UButton
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
          @click="editor.chain().focus().toggleStrike().run()"
        >
          Strike
        </UButton>
        <UButton
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
          @click="editor.chain().focus().toggleCode().run()"
        >
          Code
        </UButton>
        <UButton @click="editor.chain().focus().unsetAllMarks().run()">Clear marks</UButton>
        <UButton @click="editor.chain().focus().clearNodes().run()">Clear nodes</UButton>
        <UButton
          :class="{ 'is-active': editor.isActive('paragraph') }"
          @click="editor.chain().focus().setParagraph().run()"
        >
          Paragraph
        </UButton>
        <UButton
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          H1
        </UButton>
        <UButton
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          H2
        </UButton>
        <UButton
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          H3
        </UButton>
        <UButton
          :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        >
          H4
        </UButton>
        <UButton
          :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        >
          H5
        </UButton>
        <UButton
          :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        >
          H6
        </UButton>
        <UButton
          :class="{ 'is-active': editor.isActive('bulletList') }"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          Bullet list
        </UButton>
        <UButton
          :class="{ 'is-active': editor.isActive('orderedList') }"
          @click="editor.chain().focus().toggleOrderedList().run()"
        >
          Ordered list
        </UButton>
        <UButton
          :class="{ 'is-active': editor.isActive('codeBlock') }"
          @click="editor.chain().focus().toggleCodeBlock().run()"
        >
          Code block
        </UButton>
        <UButton
          :class="{ 'is-active': editor.isActive('blockquote') }"
          @click="editor.chain().focus().toggleBlockquote().run()"
        >
          Blockquote
        </UButton>
        <UButton @click="editor.chain().focus().setHorizontalRule().run()">Horizontal rule</UButton>
        <UButton @click="editor.chain().focus().setHardBreak().run()">Hard break</UButton>
        <UButton :disabled="!editor.can().chain().focus().undo().run()" @click="editor.chain().focus().undo().run()">
          Undo
        </UButton>
        <UButton :disabled="!editor.can().chain().focus().redo().run()" @click="editor.chain().focus().redo().run()">
          Redo
        </UButton>
        <UButton
          :class="{ 'is-active': editor.isActive('textStyle', { color: '#958DF1' }) }"
          @click="editor.chain().focus().setColor('#958DF1').run()"
        >
          Purple
        </UButton>
      </div>
    </div>
    <TiptapEditorContent :editor="editor" class="editor" />
  </PageContainer>
</template>

<script setup lang="ts">
import { useEditor } from '@tiptap/vue-3'
import { Color, TextStyle } from '@tiptap/extension-text-style'

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const editor = useEditor({
  extensions: [
    TiptapStarterKit,
    Color.configure({ types: [TextStyle.name] }),
    TextStyle,
  ],
  content: `
    <h2>
      Hi there,
    </h2>
    <p>
      this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
    <ul>
      <li>
        That’s a bullet list with one …
      </li>
      <li>
        … or two list items.
      </li>
    </ul>
    <p>
      Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    </p>
    <pre><code class="language-css">body {
  display: none;
}</code></pre>
    <p>
      I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
    </p>
    <blockquote>
      Wow, that’s amazing. Good work, boy! 
      <br />👏
      — Mom
    </blockquote>
  `,
})
</script>

<style scoped>
.control-group {
  width: 100%;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
}

.editor-page-dark .control-group {
  background: #1e293b;
  border-color: #334155;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.button-group :deep(button) {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #cbd5e1;
  transition: all 0.2s ease;
  cursor: pointer;
}

.editor-page-dark .button-group :deep(button) {
  background: #334155;
  color: #cbd5e1;
  border-color: #475569;
}

.button-group :deep(button:hover) {
  background: #e2e8f0;
}

.editor-page-dark .button-group :deep(button:hover) {
  background: #475569;
}

.button-group :deep(button.is-active) {
  background: #475569;
  color: white;
  border-color: #475569;
}

.editor-page-dark .button-group :deep(button.is-active) {
  background: #64748b;
  border-color: #64748b;
}

.button-group :deep(button:disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}

.editor {
  width: 100%;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  min-height: 400px;
  color: #1e293b;
  font-family: 'Inter', sans-serif;
}

.editor-page-dark .editor {
  background: #0f172a;
  border-color: #334155;
  color: #f1f5f9;
}

/* Basic editor styles */
.editor :deep(.tiptap) {
  outline: none;
}

.editor :deep(.tiptap :first-child) {
  margin-top: 0;
}

/* List styles */
.editor :deep(.tiptap ul),
.editor :deep(.tiptap ol) {
  margin: 1rem 0 1rem 1.5rem;
}

.editor :deep(.tiptap ul) {
  list-style-type: disc;
}

.editor :deep(.tiptap ol) {
  list-style-type: decimal;
}

.editor :deep(.tiptap ul li),
.editor :deep(.tiptap ol li) {
  margin: 0.25rem 0;
}

.editor :deep(.tiptap ul li p),
.editor :deep(.tiptap ol li p) {
  margin-top: 0;
  margin-bottom: 0;
}

/* Heading styles */
.editor :deep(.tiptap h1),
.editor :deep(.tiptap h2),
.editor :deep(.tiptap h3),
.editor :deep(.tiptap h4),
.editor :deep(.tiptap h5),
.editor :deep(.tiptap h6) {
  font-family: 'Zalando Sans', sans-serif;
  font-weight: 600;
  line-height: 1.3;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.editor :deep(.tiptap h1) {
  font-size: 1.875rem;
}

.editor :deep(.tiptap h2) {
  font-size: 1.5rem;
}

.editor :deep(.tiptap h3) {
  font-size: 1.25rem;
}

.editor :deep(.tiptap h4),
.editor :deep(.tiptap h5),
.editor :deep(.tiptap h6) {
  font-size: 1rem;
}

/* Code and preformatted text styles */
.editor :deep(.tiptap code) {
  background-color: #f1f5f9;
  color: #1e293b;
  border-radius: 0.25rem;
  padding: 0.125rem 0.25rem;
  font-size: 0.875rem;
  font-family: 'JetBrains Mono', monospace;
}

.editor-page-dark .editor :deep(.tiptap code) {
  background-color: #1e293b;
  color: #e2e8f0;
}

.editor :deep(.tiptap pre) {
  background: #0f172a;
  color: #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
  overflow-x: auto;
  font-family: 'JetBrains Mono', monospace;
}

.editor-page-dark .editor :deep(.tiptap pre) {
  background: #000;
}

.editor :deep(.tiptap pre code) {
  background: none;
  color: inherit;
  padding: 0;
}

.editor :deep(.tiptap blockquote) {
  border-left: 3px solid #cbd5e1;
  margin: 1rem 0;
  padding-left: 1rem;
  color: #64748b;
  font-style: italic;
}

.editor-page-dark .editor :deep(.tiptap blockquote) {
  border-left-color: #475569;
  color: #94a3b8;
}

.editor :deep(.tiptap hr) {
  border: none;
  border-top: 1px solid #e2e8f0;
  margin: 2rem 0;
}

.editor-page-dark .editor :deep(.tiptap hr) {
  border-top-color: #334155;
}

.editor :deep(.tiptap p) {
  margin: 0.75rem 0;
  line-height: 1.6;
}
</style>
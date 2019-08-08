import React from 'react';// React Draft Wysiwyg
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// editor initial content
const blocksFromHTML = convertFromHTML('<p>Write something...</p>');
const initialEditorContent = ContentState.createFromBlockArray(
  blocksFromHTML.contentBlocks,
  blocksFromHTML.entityMap
);

class XEditor extends React.Component {
  state = {
    editorState: EditorState.createWithContent(initialEditorContent)
  }


  onEditorStateChange = editorState => {
    console.log(editorState)
    this.setState({ editorState })
  }

  render() {
    const { editorState } = this.state;

    return (
      <Editor
        editorState={editorState}
        wrapperClassName="wysiwig-editor-wrapper"
        editorClassName="form-control"
        editorStyle={{ height: 300 }}
        onEditorStateChange={this.onEditorStateChange}
      />
    )
  }
}

export default XEditor;
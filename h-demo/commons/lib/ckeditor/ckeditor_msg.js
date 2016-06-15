ckeditor = function(textareaid, ctx) {
	CKEDITOR.context = ctx;
	// 构造对像
	var editor = CKEDITOR.replace(textareaid, {
		skin : 'office2003',

		toolbarCanCollapse : false,
		toolbarGroupCycling : true,

		toolbar : [
			{
				name : 'document',
				items : [ 'Source', '-', 'NewPage', 'DocProps', 'Preview',
						'Print', '-', 'Templates' ]
			},
			{
				name : 'clipboard',
				items : [ 'Cut', 'Copy', 'Paste', 'PasteText',
						'PasteFromWord', '-', 'Undo', 'Redo' ]
			},
			{
				name : 'editing',
				items : [ 'Find', 'Replace', '-', 'SelectAll', '-',
						'SpellChecker', 'Scayt' ]
			},

			{
				name : 'basicstyles',
				items : [ 'Bold', 'Italic', 'Underline', 'Strike', '-',
						'RemoveFormat' ]
			},
			{
				name : 'paragraph',
				items : [ 'NumberedList', 'BulletedList', '-', 'Outdent',
						'Indent', '-', 'Blockquote', 'CreateDiv', '-',
						'JustifyLeft', 'JustifyCenter', 'JustifyRight',
						'JustifyBlock', '-', 'BidiLtr', 'BidiRtl' ]
			},
			{
				name : 'links',
				items : [ 'Link', 'Unlink', 'Anchor' ]
			},
			{
				name : 'insert',
				items : [ 'Flash', 'Table', 'HorizontalRule', 'Smiley',
						'SpecialChar' ]
			},

			{
				name : 'styles',
				items : [ 'Styles', 'Format', 'Font', 'FontSize' ]
			}, {
				name : 'colors',
				items : [ 'TextColor', 'BGColor' ]
			}, {
				name : 'tools',
				items : [ 'Maximize', 'ShowBlocks', '-' ]
			} ]

	});

	return editor;
};

var App = {};

App.toolbar = {
	Basic : [
		{
			name : 'document',
			groups : [ 'mode', 'document', 'doctools' ],
			items : [ 'Source', '-', 'Print', '-', 'Templates' ]
		},
		{
			name : 'clipboard',
			groups : [ 'clipboard', 'undo' ],
			items : [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord',
					'-', 'Undo', 'Redo' ]
		},
		{
			name : 'editing',
			groups : [ 'find', 'selection', 'spellchecker' ],
			items : [ 'Find', 'Replace', '-', 'SelectAll' ]
		},
		{
			name : 'basicstyles',
			groups : [ 'basicstyles', 'cleanup' ],
			items : [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript',
					'Superscript', '-', 'RemoveFormat' ]
		},
		'/',
		{
			name : 'paragraph',
			groups : [ 'list', 'indent', 'blocks', 'align', 'bidi' ],
			items : [ 'NumberedList', 'BulletedList', '-', 'Outdent',
					'Indent', '-', 'Blockquote', 'CreateDiv', '-',
					'JustifyLeft', 'JustifyCenter', 'JustifyRight',
					'JustifyBlock', '-', 'BidiLtr', 'BidiRtl' ]
		},
		{
			name : 'links',
			items : [ 'Link', 'Unlink', 'Anchor' ]
		},
		{
			name : 'insert',
			items : [ 'Image', 'Flash', 'Table', 'HorizontalRule',
					'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ]
		}, '/', {
			name : 'styles',
			items : [ 'Styles', 'Format', 'Font', 'FontSize' ]
		}, {
			name : 'colors',
			items : [ 'TextColor', 'BGColor' ]
		}, {
			name : 'tools',
			items : [ 'Maximize', 'ShowBlocks' ]
		}, {
			name : 'others',
			items : [ '-' ]
		} ],
Basic1 : [
 		{
			name : 'document',
			groups : [ 'mode', 'document', 'doctools' ],
			items : [ 'Source', '-', 'Print', '-', 'Templates' ]
		},
		{
			name : 'clipboard',
			groups : [ 'clipboard', 'undo' ],
			items : [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord',
					'-', 'Undo', 'Redo' ]
		},
		{
			name : 'editing',
			groups : [ 'find', 'selection', 'spellchecker' ],
			items : [ 'Find', 'Replace', '-', 'SelectAll' ]
		},
		{
			name : 'basicstyles',
			groups : [ 'basicstyles', 'cleanup' ],
			items : [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript',
					'Superscript', '-', 'RemoveFormat' ]
		},
		'/',
		{
			name : 'paragraph',
			groups : [ 'list', 'indent', 'blocks', 'align', 'bidi' ],
			items : [ 'NumberedList', 'BulletedList', '-', 'Outdent',
					'Indent', '-', 'Blockquote', 'CreateDiv', '-',
					'JustifyLeft', 'JustifyCenter', 'JustifyRight',
					'JustifyBlock', '-', 'BidiLtr', 'BidiRtl' ]
		},
		{
			name : 'links',
			items : [ 'Link', 'Unlink', 'Anchor' ]
		},
		{
			name : 'insert',
			items : [ 'Image', 'Flash', 'Table', 'HorizontalRule',
					'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ]
		}, '/', {
			name : 'styles',
			items : [ 'Styles', 'Format', 'Font', 'FontSize' ]
		}, {
			name : 'colors',
			items : [ 'TextColor', 'BGColor' ]
		}, {
			name : 'tools',
			items : [ 'Maximize', 'ShowBlocks' ]
		}, {
			name : 'others',
			items : [ '-' ]
		} ]
};

export function fileModificationsToHTML(modifications: Record<string, string>): string {
  if (!modifications || Object.keys(modifications).length === 0) {
    return '';
  }

  let html = '<div class="file-modifications">\n';
  
  for (const [filePath, content] of Object.entries(modifications)) {
    html += `<div class="file-modification">\n`;
    html += `<h4>${filePath}</h4>\n`;
    html += `<pre><code>${escapeHtml(content)}</code></pre>\n`;
    html += `</div>\n`;
  }
  
  html += '</div>';
  return html;
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

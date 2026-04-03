import re
import os

file_path = r"e:\Work\Grad Project 26'\Coding\Advertisig Website html\Stylesheet.css"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Regular expression for CSS comments: /* ... */
# Note: Should handle multiline comments.
cleaned_content = re.sub(r'/\*[\s\S]*?\*/', '', content)

# Remove extra whitespace/newlines that might be left by comments
# (Optional, but cleaner)
# cleaned_content = re.sub(r'\n\s*\n', '\n\n', cleaned_content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(cleaned_content)

print("CSS comments removed successfully.")

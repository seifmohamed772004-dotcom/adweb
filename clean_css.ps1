$path = "e:\Work\Grad Project 26'\Coding\Advertisig Website html\Stylesheet.css"
$content = [System.IO.File]::ReadAllText($path)
# Replace CSS comments /* ... */
# Using (?s) to make . match newlines for multiline comments
$content = [regex]::Replace($content, "(?s)/\*.*?\*/", "")
[System.IO.File]::WriteAllText($path, $content)
Write-Output "CSS comments removed."

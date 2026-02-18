$folderPath = "D:\duckmath\"   # 🔁 apna folder path daal do

Get-ChildItem $folderPath -Filter *.html -Recurse | ForEach-Object {

    $filePath = $_.FullName
    $content = Get-Content $filePath -Raw

    # Skip if FAQ schema already exists
    if ($content -match '"@type"\s*:\s*"FAQPage"') {
        Write-Host "FAQ schema already exists in $filePath"
        return
    }

    # Find FAQ section
    if ($content -match '(?s)<h2>Frequently Asked Questions</h2>(.*?)</h2>') {
        $faqSection = $matches[1]
    }
    else {
        Write-Host "No FAQ section found in $filePath"
        return
    }

    # Extract Questions and Answers
    $qaMatches = [regex]::Matches($faqSection, '(?s)<h2>(.*?)</h2>\s*<p>(.*?)</p>')

    if ($qaMatches.Count -eq 0) {
        Write-Host "No Q&A pairs found in $filePath"
        return
    }

    $faqEntities = @()

    foreach ($match in $qaMatches) {
        $question = ($match.Groups[1].Value -replace '<.*?>','').Trim()
        $answer   = ($match.Groups[2].Value -replace '<.*?>','').Trim()

        $faqEntities += @{
            "@type" = "Question"
            "name" = $question
            "acceptedAnswer" = @{
                "@type" = "Answer"
                "text" = $answer
            }
        }
    }

    $schema = @{
        "@context" = "https://schema.org"
        "@type" = "FAQPage"
        "mainEntity" = $faqEntities
    } | ConvertTo-Json -Depth 5 -Compress

    $scriptTag = "`n<script type=`"application/ld+json`">$schema</script>`n"

    # Insert before <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HSTHCSNXTK"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HSTHCSNXTK');
</script>
</head>
    $updatedContent = $content -replace "<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HSTHCSNXTK"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HSTHCSNXTK');
</script>
</head>", "$scriptTag<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HSTHCSNXTK"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HSTHCSNXTK');
</script>
</head>"

    Set-Content -Path $filePath -Value $updatedContent -Encoding UTF8

    Write-Host "FAQ schema added to $filePath"
}

Write-Host "✅ Done for all files!"

 
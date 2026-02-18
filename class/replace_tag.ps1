Get-ChildItem -Directory | ForEach-Object {

    $folder = $_.Name
    $index = Join-Path $_.FullName "index.html"

    if (!(Test-Path $index)) { return }

    $html = Get-Content $index -Raw

    if ($html -notmatch "<!--content-side-image-->") { return }

$block = @"
<aside style="flex:0 0 260px;min-width:180px;text-align:center;"><img alt="$folder" src="/images/$folder@2x.webp"  style="width:100%;height:auto;border-radius:6px;box-shadow:0 6px 18px rgba(0,0,0,0.08);" loading="lazy" /> <div style="margin-top:12px;text-align:left;font-size:14px;color:#444;"></div></aside>
"@

    $html = $html -replace "<!--content-side-image-->", $block

    Set-Content $index $html -Encoding UTF8
}

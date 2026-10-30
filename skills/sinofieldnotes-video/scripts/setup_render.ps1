param(
  [Parameter(Mandatory = $true)][string]$Episode,
  [string]$Workspace = (Get-Location).Path
)

$ErrorActionPreference = "Stop"
$ep = (Resolve-Path $Episode).Path
$engine = Join-Path $Workspace ".runtime/research/whiteboard/engine"
$modules = Join-Path $Workspace ".runtime/research/whiteboard/node_modules"

if (-not (Test-Path $engine)) { throw "engine not found: $engine" }
if (-not (Test-Path $modules)) { throw "node_modules not found: $modules" }

$template = Join-Path $PSScriptRoot "..\templates\index.html"
if (-not (Test-Path (Join-Path $ep "index.html"))) {
  Copy-Item $template (Join-Path $ep "index.html")
}

foreach ($pair in @(@("engine", $engine), @("engine_modules", $modules))) {
  $link = Join-Path $ep $pair[0]
  if (-not (Test-Path $link)) {
    New-Item -ItemType Junction -Path $link -Target $pair[1] | Out-Null
  }
}

New-Item -ItemType Directory -Force (Join-Path $ep "out") | Out-Null

Write-Host "render in place:"
Write-Host "  cd `"$ep`""
Write-Host "  node `"$engine\tools\render.mjs`" --fps 30 --skip-subs --workers 3"

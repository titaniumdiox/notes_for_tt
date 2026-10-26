param(
  [Parameter(Mandatory = $true)][string]$EpisodeDir,
  [string]$VoiceName = 'Microsoft Zira Desktop',
  [int]$Rate = -1
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Speech

$voPath = Join-Path $EpisodeDir 'vo_en.txt'
if (-not (Test-Path -LiteralPath $voPath)) { throw "missing $voPath" }

$text = Get-Content -LiteralPath $voPath -Raw -Encoding UTF8
$paras = [regex]::Split($text.Trim(), "\r?\n\s*\r?\n") | Where-Object { $_.Trim() }
if ($paras.Count -eq 0) { throw "no paragraphs in $voPath" }

$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.SelectVoice($VoiceName)
$synth.Rate = $Rate
$synth.Volume = 100

$index = 0
foreach ($para in $paras) {
  $index++
  $out = Join-Path $EpisodeDir ("scratch_part_{0:D2}.wav" -f $index)
  $synth.SetOutputToWaveFile($out)
  $synth.Speak($para.Trim())
  $synth.SetOutputToNull()
  $preview = $para.Trim()
  if ($preview.Length -gt 70) { $preview = $preview.Substring(0, 70) + '...' }
  Write-Output ("part {0:D2}: {1}" -f $index, $preview)
}

$synth.Dispose()
Write-Output ("parts={0} dir={1}" -f $index, $EpisodeDir)

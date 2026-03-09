function Str(el)
  if el.text == "💣" then
    return pandoc.RawInline("latex", "\\twemoji{1f4a3}")
  elseif el.text == "🚩" then
    return pandoc.RawInline("latex", "\\twemoji{1f6a9}")
  end
  return el
end
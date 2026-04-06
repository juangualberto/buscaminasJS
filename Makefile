PANDO = pandoc
# FLAGS = --top-level-division=chapter --listings -r markdown-auto_identifiers -w latex -o
# FLAGS = --top-level-division=chapter --listings -o
# FLAGS = --lua-filter ./docs/emojis.lua --include-in-header=./docs/header-icons.tex --template docs/eisvogel --listings --number-sections --pdf-engine=xelatex
# -V mainfont="DejaVu Serif" -V sansfont="DejaVu Sans" -V monofont="DejaVu Sans Mono"

FLAGS = --include-in-header=./docs/header-icons.tex --template docs/eisvogel --listings --number-sections --pdf-engine=xelatex

all:
	$(PANDO) ./docs/0*.md ./docs/1*.md -o ./docs/Libro.pdf $(FLAGS)

clean:
	rm *aux
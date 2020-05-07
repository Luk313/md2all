# Fonctionnalités Markdown Simples

## 1.1 : Les Listes

phrase

### Listes NON Ordonnées, NON incrémentales (apparition directe)

* Premier Item
* Deuxième Item
* Troisième Item

### Listes NON Ordonnées, incrémentales (apparition avec PAUSE)

> * Premier Item
> * Deuxième Item
> * Troisième Item

### Listes NON Ordonnées, incrémentales (apparition avec PAUSE, version LaTeX)

* Premier Item
\pause
* Deuxième Item
\pause
* Troisième Item

## Liste Ordonnée, NON incrémentale (apparition directe)

1. Fraises
2. Framboises
3. Kiwis

## Liste Ordonnée, Incrémentale (apparition avec PAUSE)

> 1. Fraises
> 2. Framboises
> 3. Kiwis

### Math Formula

* $\sqrt 2 \approx 1.414..$
* $\sum \limits_{i=1}^{n} i = 1 + 2 + 3 + ... + n = \frac{n(n+1)}{2}$

### Images

![Image 1](img/bateau.jpg)

### Images Resizées

![Image 1](img/bateau.jpg){width=80%}

## Code Source

### Code Source Python dans un 'block' LaTeX avec Syntax Highlighting, hérité via Pandoc/Markdown

#### PYTHON

```{.python .numberLines startFrom="5"}
for i in range(100):
    if i%2==0:
        print("Pair!")
while i<10:
    i += 1
def maFonction(x):
    print("Hello",x)
```

### Code Source HTML dans un 'block' LaTeX avec Syntax Highlighting, hérité via Pandoc/Markdown

#### HTML

```{.html .numberLines}
<body>
    <div class="box">
        <div class="morpion">
            <div class="case">X</div>
            <div class="case">Y</div>
            <div class="case">Z</div>
            <div class="case">A</div>
            <div class="case">B</div>
            <div class="case">C</div>
            <div class="case">T</div>
            <div class="case">U</div>
            <div class="case">V</div>
        </div>
    </div>
</body>
```

### footnotes

* Eat Oranges[^1]
* Drink Coffee
* Drink Water

[^1]: Footnote One

# Fonctionnalités LaTeX plus avancées

## Texte

### Mise en Valeur (en Rouge)

\alert{Texte en Rouge et \emph{italique}}.

## Listes

### Liste Itemize

\begin{itemize}
    \item premier élément de liste,
    \item deuxième élément de liste,
    \pause
    \item troisième élément de liste.  
\end{itemize}

### Listes de Description, utiles pour des Définitions

 \begin{description}
    \item [Thème de présentation : ] ces thèmes sont en fait...
    \item [Thème de couleur : ] gère tout ce qui est couleur...
    \item [Thème de police : ] s'occupe de tout ce qui est police, gras...
    \item [Thème interne : ] s'occupe de l'apparence des éléments...
    \item [Thème externe : ] gère les en-têtes et pieds de page...
\end{description}

## Les environnements Block: 'block', 'alertblock' et 'exampleblock'

### Les Blocks 'Block', 'alertblock' et 'exampleblock'

\begin{block}{Un bloc normal}
  Texte du block \texttt{block}
\end{block}

\begin{alertblock}{Un bloc alerte}
 Texte du block \texttt{alertblock}
\end{alertblock}

\begin{exampleblock}{Un bloc exemple}
 Exemple de block \texttt{exampleblock}
\end{exampleblock}

### Un Block (e.g.) 'lightCode' Customisé

\begin{lightCode}{Un bloc customisé}
  Apparence et Texte du block cutomisé \texttt{lightCode}
\end{lightCode}


## Quelques Environnements

### Environnement Columns

\begin{columns}
\begin{column}{0.5\textwidth}
    \begin{block}{HTML}
        \begin{itemize}
            \item premier élément de liste,
            \item deuxième élément de liste,
            \pause
            \item troisième élément de liste.  
        \end{itemize}    
    \end{block}
   Bla bla bla
\end{column}
\begin{column}{0.5\textwidth}  %%<--- here
    \begin{center}
        \includegraphics[width=0.5\textwidth]{img/chouette.png}
    \end{center}
\end{column}
\end{columns}

### L'environnement Columns ne fonctionne pas avec le Syntax Highlighting dans un bloc, hérité de Markdown

\begin{columns}
\begin{column}{0.5\textwidth}
    \begin{block}{HTML}
        \begin{itemize}
            \item premier élément de liste,
            \item deuxième élément de liste,
            \pause
            \item troisième élément de liste.  
        \end{itemize}    
    \end{block}
   Bla bla bla
\end{column}
\begin{column}{0.5\textwidth}  %%<--- here
    \begin{center}
     \includegraphics[width=0.5\textwidth]{img/chouette.png}
     \end{center}
        \begin{lightCode}{HTML}
            for i in range(100):
                if i%2==0:
                    print("Pair!")
            while i<10:
                i += 1
            def maFonction(x):
                print("Hello",x)
        \end{lightCode}
\end{column}
\end{columns}

### les Environnements Cadrés

\begin{definition}
    environnement definition
\end{definition}
  
\begin{example}
   environnement example
\end{example}

\begin{theorem}
    Il n'existe PAS de plus grand nombre premier
\end{theorem}

\begin{proof}
\begin{itemize}
    \item Supposons que $p$ soit ce plus grand nombre premier\pause
    \item Soit $q$ le ... des $p$ premiers nombres premiers\pause
    \item Alors $q+1$ n'est divisible par ...\pause
    \item Donc $q+1$ est un nombre premier ... $p$.\pause
\end{itemize}
\end{proof}

### Enumerate

\begin{theorem}Il n'existe PAS de plus nombre premier.
\end{theorem}

\begin{proof}
\begin{enumerate}
    \item<1-| alert@1> Supposons que  $p$ soit ce plus grand nombre premier.
    \item<2->Soit $q$ le produit des $p$ premiers nombres premiers\pause
    \item<3-> Alors $q+1$ n'est divisible par aucun d'entre eux\pause
    \item<1-> Or $q+1$ est supérieur à $1$, donc Donc $q+1$ est divisible par un nombre premier autre que les $p$ premiers.\pause\qedhere
\end{enumerate}
\end{proof}

### Les Overlays

\begin{overlayarea}{6cm}{1cm}
   \only<1>{\texttt{première idée overlayarea}}
   \only<2>{\texttt{deuxième idée overlayarea}}
   \only<3>{\texttt{troisième idée}}
   \only<4>{dernière idée}
\end{overlayarea}



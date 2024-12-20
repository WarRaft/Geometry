# Пересечение прямоугольников

Пускай у нас есть два прямоугольника, которые [ориентированы по осям](cartesian-rect-oriented.md) и заданы двумя
точками $A, B$ и $C, D$ соответственно. Где точки $A, C$ для своих прямоугольников являются верхними левыми, а $B, D$
соответственно правыми нижними.

Если прямоугольники заданы по другому, то их необходимо привести к такому виду:

$$ A_{(minX, maxY)}, B_{(maxX, minY)} $$
$$ C_{(minX, maxY)}, D_{(maxX, minY)} $$

Далее необходимо воспользоваться методом, который мы применяли
при нахождении [пересечений отрезков](number-line-segment-intersect.md) на [числовой прямой](number-line.md) —
спроецировать точки на оси и найти их пересечения:

$$ X_{min} = \max(A_x, C_x) $$
$$ X_{max} = \min(B_x, D_x) $$

Обратите внимание, из-за того, что ось $ Y $ растёт вверх, точки в функции переданы в обратном порядке:

$$ Y_{min} = \max(C_y, A_y) $$
$$ Y_{max} = \min(D_y, B_y) $$

Если пересечение существует, тогда должны выполняться следующие условия:

$$ X_{min} \leq X_{max} $$
$$ Y_{min} \leq Y_{max} $$

В случае успешной проверки существования пересечения, получится новый прямоугольник, вершины которого будут иметь
следующие координаты:

$$
\begin{matrix}
(X_{min}, Y_{max}) & (X_{max}, Y_{max})  \\
(X_{min}, Y_{min}) & (X_{max}, Y_{min})
\end{matrix}
$$

Если подставить значения, то координаты двух точек задающих прямоугольник, возникающий при пересечении двух других будут
выглядеть таким образом:

$$ (\max(A_x, C_x), \min(D_y, B_y)), (\min(B_x, D_x), \max(C_y, A_y)) $$

```.``` {id=canvas-cartesian-rect-oriented-intersect}

Для большей наглядности сместим оси чтоб стали видны линии проекции:

```.``` {id=canvas-cartesian-rect-oriented-intersect-projection}
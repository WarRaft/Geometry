# Линейная интерполяция

<include from="number-line-lerp.md" element-id="lerp"/>

Для произвольного [отрезка](cartesian-line.md) в [декартовой системе координат](cartesian-coordinate-system.md) верно
учтверждение, что произвольная точка $ C $ принадлежит отрезку $ \overline{AB} $ если существует параметр $ t $ в
интервале $[0,1]$, для которого выполняются следующие равенства:

$$
\begin{cases}
С_x = A_x + (B_x - A_x) \cdot t \\
С_y = A_y + (B_y - A_y) \cdot t
\end{cases}
$$

```.``` {id=canvas-cartesian-segment-lerp}

Как видите, уравнения похожи на [линейную интерполяцию](number-line-lerp.md) на [числовой прямой](number-line.md), чем
они по сути и являются для проекций отрезка на оси координат.


```.``` {id=canvas-cartesian-segment-lerp-projection}

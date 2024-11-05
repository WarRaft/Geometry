# Абсолютная величина числа

Абсолютная величина, или модуль числа $x$ — неотрицательное число, обозначающее расстояние от начала координат до $x$.
Обозначается как $|x|$.

```.``` {id=canvas-number-line-abs}

## Вычисление в игре {id="game"}

<tabs>
    <tab id="AngelScript" title="AngelScript">

```C#
void main(){
    int A = 3;
    int B = -5;
    print(+A); // 3
    print(+B); // 5
}
```

</tab>
    <tab id="JASS" title="JASS">

```sql
native MathIntegerAbs takes integer i returns integer
native MathRealAbs takes real r returns real
```

</tab>
<tab id="Lua" title="Lua">

```sql
print(math.abs(3)) // 3
print(math.abs(-5)) // 5
```

</tab>
</tabs>

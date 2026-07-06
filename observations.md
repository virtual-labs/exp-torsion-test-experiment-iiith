### What is Measured?

During the torsion test, the following quantities are measured:

- Applied torque, $T$
- Angle of twist, $\theta$
- Diameter of the specimen, $d$
- Gauge length of the specimen, $L$

These measurements are used to determine the torsional properties of the material.

### Why are the Calculations Required?

The measured quantities alone do not completely describe the behaviour of a material under torsion.

The calculations help determine:

- Polar moment of inertia
- Maximum shear stress
- Modulus of Rigidity (Shear Modulus)
- Relationship between torque and angle of twist

These properties are required for the design of shafts and other torque-transmitting components.

### Observation Table

Assume a solid circular steel specimen with:

- Diameter = 20 mm
- Gauge Length = 300 mm

| Torque (N·m) | Angle of Twist (degree) |
| ------------ | ----------------------- |
| 0            | 0.0                     |
| 20           | 0.32                    |
| 40           | 0.65                    |
| 60           | 0.98                    |
| 80           | 1.31                    |
| 100          | 1.64                    |
| 120          | 1.96                    |
| 140          | 2.28                    |

### Sequential Calculations

#### 1. Polar Moment of Inertia

For a solid circular shaft,

$$
J=\frac{\pi d^4}{32}
$$

For $d=20$ mm,

$$
J=\frac{\pi(20)^4}{32}
$$

$$
J=15708\ \text{mm}^4
$$

#### 2. Convert Torque

For calculations,

$$
1\ \mathrm{N\cdot m}=1000\ \mathrm{N\cdot mm}
$$

#### 3. Convert Angle

Convert degrees into radians.

$$
\theta=\frac{\pi}{180}\times(\text{degrees})
$$

#### 4. Maximum Shear Stress

$$
\tau=\frac{16T}{\pi d^3}
$$

#### 5. Modulus of Rigidity

$$
G=\frac{TL}{J\theta}
$$

### Solved Numerical Example

Given

- Diameter = 20 mm
- Length = 300 mm
- Torque = 100 N·m
- Angle of Twist = 1.64°

#### Step 1

Convert torque.

$$
T=100\times1000=100000\ \mathrm{N\cdot mm}
$$

#### Step 2

Convert angle.

$$
\theta=\frac{\pi}{180}\times1.64
$$

$$
\theta=0.0286\ \text{rad}
$$

#### Step 3

Polar moment of inertia.

$$
J=15708\ \text{mm}^4
$$

### Step 4

Modulus of Rigidity.

$$
G=\frac{100000\times300}{15708\times0.0286}
$$

$$
G\approx66740\ \text{N/mm}^2
$$

$$
G\approx66.7\ \text{GPa}
$$

This value is close to the typical modulus of rigidity of structural steel.

### Interpretation of Results

- A linear torque–twist graph indicates elastic behaviour.
- Larger angles of twist indicate greater torsional deformation.
- Higher Modulus of Rigidity indicates greater resistance to twisting.
- The experiment verifies the torsion equation within the elastic range.

### Interpretation of the Torque–Twist Graph

Observe the graph generated during the simulation.

From the graph, identify:

- Linear elastic region
- Proportional relationship between torque and twist
- Deviation from linearity (if loading exceeds elastic limit)

Materials with higher rigidity exhibit smaller angles of twist for the same applied torque.

### Result

The torsion test was performed successfully, and the relationship between torque and angle of twist was obtained. The Modulus of Rigidity of the material was determined, and the torsion equation was verified within the elastic limit.

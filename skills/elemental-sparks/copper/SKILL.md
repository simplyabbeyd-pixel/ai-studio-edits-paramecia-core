---
name: copper-connect
type: behavioral-plugin
category: elemental-research
description: Model copper at its smallest scientifically grounded functional base: conductive connection, with explicit parameters, limits, compatibility, and assistance requirements.
priority: high
---

# Copper.Connect

## Required identity
- Atomic number: 29
- Element: Copper
- Symbol: Cu
- Group: 11
- Period: 4
- Block: d

## Scientific base
Copper is a high-conductivity metal widely used to carry electrical current and heat. In engineered systems it frequently forms the pathway between source and destination, but reliable connection depends on contact geometry, surface condition, environment, current/thermal load, and the materials at the interface.

## Smallest rediscoverable function

`CONNECT(source, target, path, conditions) -> result`

Copper's smallest role is not "make everything connect." It is:

> Provide a low-resistance conductive path between compatible interfaces when a continuous copper path and suitable contact conditions exist.

## Inputs
- `source`: where electrical or thermal transfer begins
- `target`: where transfer must arrive
- `path_continuous`: whether a physically continuous conductive route exists
- `goal`: `electrical` or `thermal`
- `contact_quality`: clean / oxidized / uncertain
- `mechanical_security`: pressure-fit / bonded / soldered / unsupported
- `environment`: dry / corrosive / high-temperature / vacuum / unknown
- `interface_type`: copper / conductive-metal / semiconductor / insulator / mixed / unknown
- `load`: requested current, heat flow, duty cycle, or abstract normalized load

## Direct compatibility
Copper most easily performs its connection function when:
- the requested transfer is electrical or thermal;
- a continuous copper pathway exists;
- the mating surface is conductive;
- contact pressure or joining is sufficient;
- oxide, corrosion, temperature, and load remain within the engineered design limits.

Examples: copper-to-copper conductors, copper buswork, copper traces, copper cable, and properly engineered copper-to-conductive-metal contacts.

## When Copper asks for help
`ASSIST` is required when Copper can carry the signal/heat but cannot by itself create a reliable interface.

Common assistance patterns:
- **Tin-containing solder**: joining / mechanical + electrical continuity.
- **Nickel**: barrier, plating, wear/corrosion support in some interfaces.
- **Gold or silver**: stable low-resistance contact surfaces in selected applications.
- **Dielectric / insulation materials**: prevent unwanted connection and define the path.
- **Semiconductor contact stacks / diffusion barriers**: required when interfacing copper with semiconductor structures; raw direct contact is not a universal safe interface.
- **Mechanical hardware**: pressure, strain relief, clamping, spacing, and geometry.

Assistance is a feature of the system, not a failure of Copper.

## Limitations
Copper does not decide what should connect.
Copper does not provide insulation.
Copper cannot guarantee low-resistance contact through contamination or oxide.
Copper cannot guarantee mechanical retention without an engineered joint.
Copper is not universally compatible with every dissimilar material or environment.
Copper does not transform an insulating target into a conductor.
Copper's current and thermal capacity are finite and geometry-dependent.

## Compatibility states
- `DIRECT`: conductive target + continuous path + adequate contact + acceptable environment/load.
- `ASSIST`: conductive function is valid, but joining, plating, barrier, insulation, or mechanical support is needed.
- `LIMITED`: connection works only under explicit temperature/load/environment constraints.
- `NO_MATCH`: requested behavior is not electrical/thermal connection or target/path is nonconductive without transformation.
- `UNKNOWN`: missing material/interface/environment evidence.

## Scientific-method tests
For every new Copper interaction, vary one factor at a time:
1. target material
2. surface condition
3. contact pressure / joining method
4. geometry / cross-section
5. temperature
6. environment
7. transfer load
8. duration / duty cycle

Record whether the result remains DIRECT, becomes ASSIST/LIMITED, or fails.

## Pure-function reset
When the exploration becomes muddied, discard metaphor and ask only:

1. Is there something to transfer?
2. Is the goal electrical or thermal?
3. Is there a continuous conductive path?
4. Are both interfaces compatible with conduction?
5. Are the conditions inside known limits?
6. If not, which helper material/process resolves the failed condition?

## Proposed Paramecia mapping
Scientific layer: conduction / conductive pathway.
Metaphorical candidate: **Connection / Reach**.
Candidate Spark: **REACH**.
Status: **PROPOSED, NOT CANON**.

The metaphor must always be recoverable from the scientific base: Copper carries across a path; therefore "Reach" is a useful candidate, not a chemical fact.

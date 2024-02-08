# Scope Calculator [![Netlify Status](https://api.netlify.com/api/v1/badges/09951187-59e0-45d9-8230-a1a66ab3b8e9/deploy-status)](https://app.netlify.com/sites/brilliant-fenglisu-be5de0/deploys)
> Specifically developed to help assist me zero my RDS.

## [Link](https://0rds.prashant.me/)

## Variables
1. Provide `clicksPerMOA` value from your RDS's manual, common values are: `0.5` and `1`.
2. `yardsToTarget` is the distance in yards to your target. *Conversions are done automatically at the bottom if needed.*
3. `inchesOffTarget` is the POI (Point of Impact) from your POA (Point of Aim), please provide only positive numbers.
   - Provide inches off target for elevation or windage, once per calculation. Do not average them or do your own calculation.
   - If your POI is `2.5` inches lower and `1.3` inches left to your POA, calculate clicks required by providing `2.5` as an input, not `-2.5`.
   - Calculate elevation and windage separately.
  
## Attributions
1. [ReactJS](https://react.dev/)
2. [BlueprintJS](https://blueprintjs.com/)

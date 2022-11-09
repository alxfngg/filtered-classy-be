router.route('/requirements')
    .get(async (req, res) => {
        try {
            const result = await RequirementController.getRequirements();
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })

router.route('/requirements/:id')
    .get(async (req, res) => {
        try {
            const result = await RequirementController.getRequirement(req.parms.id);
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            console.log(req.body);
            const result = await RequirementController.createRequirement(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            console.log(req.body);
            const result = await RequirementController.updateRequirement(req.body.id, req.body.requirement);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            console.log(req.body);
            const result = await RequirementController.deleteRequirement(req.body.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

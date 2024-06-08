<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Interface</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #E6EEF8;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .question {
            font-size: 1.2em;
            margin-bottom: 20px;
        }
        .author {
            display: inline-block;
            background-color: #F3F0F0;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.9em;
            color: #666;
            margin-bottom: 20px;
        }
        .difficulty {
            display: inline-block;
            background-color: #D0C1E8;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.9em;
            color: #666;
            margin-bottom: 20px;
            margin-left: 10px;
        }
        .options {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 20px;
        }
        .options button {
            flex: 1 1 calc(50% - 10px);
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #F5F5F5;
            cursor: pointer;
            font-size: 1em;
        }
        .options button:hover {
            background-color: #e0e0e0;
        }
        .submit-btn {
            display: block;
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 5px;
            background-color: #3B8FC2;
            color: white;
            font-size: 1em;
            cursor: pointer;
            margin-bottom: 20px;
        }
        .submit-btn:hover {
            background-color: #3377A2;
        }
        .explanation, .references, .link, .reviewed-by {
            margin-bottom: 10px;
        }
        .explanation-content, .references-content, .link-content, .reviewed-by-content {
            background-color: #F9F9F9;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="question">
        The manual maneuver recommended for removing suspected foreign body airway obstructions in a responsive adult is:
    </div>
    <div class="author">Author</div>
    <div class="difficulty">● medium</div>
    <div class="options">
        <button>Gloves</button>
        <button>Gloves, Mask, Goggles and Gown</button>
        <button>Gloves and Gown</button>
        <button>Gloves and Mask</button>
    </div>
    <button class="submit-btn">Submit</button>
    <div class="explanation">
        <strong>Explanation</strong>
        <div class="explanation-content">
            COVID-19 can be transmitted by droplets and aerosolization. The appropriate PPE (personal protective equipment) includes mask, gloves, gown and eye protection. Ideally, an N95 mask or respirator should be used. This mask should always be used with performed procedures that may cause aerosolization (e.g., intubation, bag mask ventilation, nebulization, noninvasive positive pressure ventilation, etc…)
        </div>
    </div>
    <div class="references">
        <strong>References</strong>
        <div class="references-content">
            <!-- References content here -->
        </div>
    </div>
    <div class="link">
        <strong>Link</strong>
        <div class="link-content">
            <!-- Link content here -->
        </div>
    </div>
    <div class="reviewed-by">
        <strong>Reviewed By</strong>
        <div class="reviewed-by-content">
            <!-- Reviewed By content here -->
        </div>
    </div>
</div>

</body>
</html>
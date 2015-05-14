describe('mvp version of rock paper scissors', function() {
	beforeEach(function() {
		browser.get('http://localhost:8001');
	});

	describe('should work for player 1', function() {
		choices("#player1");
		highlight("#player1");
	});

	describe('should work for player 2', function() {
		choices("#player2");
		highlight("#player2");
	});

	function choices(player) {	
		it('should see a choice of Rock, Paper and Scissors', function() {
			expect(element(by.css(player+' #rock')).isPresent()).toBe(true);
			expect(element(by.css(player+' #paper')).isPresent()).toBe(true);
			expect(element(by.css(player+' #scissors')).isPresent()).toBe(true);
		});
	}

	function highlight(player) {	
		it('Rock should highlight when clicked and all others should be unhighlighted', function() {
			var rockClasses, paperClasses, scissorsClasses;
			element(by.css(player+' #rock')).click().then(function() {
				element(by.css(player+' #rock')).getAttribute('class').then(function(classes) {
					rockClasses = classes;
					element(by.css(player+' #paper')).getAttribute('class').then(function(classes) {
						paperClasses = classes;
						element(by.css(player+' #scissors')).getAttribute('class').then(function(classes) {
							scissorsClasses = classes;

							expect(rockClasses).toMatch('user_selected');
							expect(paperClasses).not.toMatch('user_selected');
							expect(scissorsClasses).not.toMatch('user_selected');
						});
					});
				});
			});
		});
	}
})

